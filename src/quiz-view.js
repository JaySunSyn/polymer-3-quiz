import {PolymerElement, html} from '@polymer/polymer/polymer-element';
import '@polymer/polymer/lib/elements/dom-repeat';
import '@polymer/polymer/lib/elements/dom-if';

import '@polymer/iron-form/iron-form';

import '@polymer/paper-button/paper-button';
import '@polymer/paper-input/paper-input';

import './checkbox-question.js';
import './radio-question.js';

/**
 * `quiz-view` Description
 *
 * @summary ShortDescription.
 * @customElement
 * @polymer
 * @extends {Polymer.Element}
 */
class QuizView extends PolymerElement {
    static get properties() {
        return {
            data: Array,

            _prevDisabled: {
                type: Boolean,
                computed: '_computePrevDisabled(pageNumber)',
            },

            _nextBtnTitle: {
                type: String,
                computed: '_compteNextBtnTitle(data.length, pageNumber)',
            },

            pageNumber: {
                type: Number,
                value: 0,
            },

            url: {
                type: String,
                value: '/',
            },

            method: {
                type: String,
                value: 'post',
            },
        };
    }
    static get template() {
        return html`
            <style>
                .container {
                    margin: 24px;
                    max-width: 600px;
                }
                
                .question {
                    margin: 12px;
                    padding: 12px;
                }

                .space {
                    display: flex;
                    flex: auto;
                }

                #page {
                    margin-bottom: 128px;
                }

                #footer {
                    position: fixed;
                    display: flex;
                    padding: 12px;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    background-color: var(--bar-color);
                    color: var(--accent-text-color);
                    transition: opacity 2s;
                    height: 64px;
                    box-sizing: border-box;
                }

                #footer paper-button[disabled] {
                    background-color: transparent;
                }

                #footer paper-button:not([disabled]) {
                    background-color: var(--primary-color);
                }

                #footer paper-button#nxtBtn {
                    background-color: var(--accent-color);
                    max-width: 100px;
                    transition: max-width 1s;
                }

                #footer paper-button#nxtBtn[send] {
                    width: 100%;
                    max-width: 200px;
                }
            </style>
            <div class="container">
                <iron-form on-iron-form-response="_formRequestResponded" on-iron-form-error="_formError">
                    <form method$="[[method]]" action$="[[url]]">
                        <section id="page">
                            <template is="dom-repeat" items="[[data]]" as="page" index-as="idx">
                                <div hidden="[[!_eql(pageNumber,idx)]]">
                                    <h2>[[page.title]]</h2>
                                    <div class="questions">
                                        <template is="dom-repeat" items="[[page.questions]]" as="question">
                                            <h3>[[question.title]]</h3>
                                            <div class="question">
                                                <template is="dom-if" if="[[_eql(question.type, 'checkbox')]]">
                                                    <checkbox-question
                                                        disabled="[[!_beql(pageNumber,idx)]]"
                                                        required="[[question.required]]"
                                                        name="[[question.name]]"
                                                        choices="[[question.choices]]">
                                                    </checkbox-question>
                                                </template>
                                                <template is="dom-if" if="[[_eql(question.type, 'radio')]]">
                                                    <radio-question
                                                        disabled="[[!_beql(pageNumber,idx)]]"
                                                        required="[[question.required]]"
                                                        name="[[question.name]]"
                                                        choices="[[question.choices]]">
                                                    </radio-question>
                                                </template>
                                                <template is="dom-if" if="[[_eql(question.type, 'input')]]">
                                                    <paper-input
                                                        disabled="[[!_beql(pageNumber,idx)]]"
                                                        required="[[question.required]]"
                                                        name="[[question.name]]"
                                                        label="[[question.label]]">
                                                    </paper-input>
                                                </template>
                                            </div>
                                        </template>
                                    </div>
                                </div>
                            </template>
                        </section>
                        <section id="footer">
                            <paper-button
                                id="prevBtn"
                                disabled="[[_prevDisabled]]"
                                on-tap="prev">BACK</paper-button>
                            <div class="space"></div>
                            <paper-button
                                id="nxtBtn"
                                on-tap="next"
                                send$="[[_isLastPage(data.length, pageNumber)]]">[[_nextBtnTitle]]</paper-button>
                        </section>
                    </form>
                </iron-form>
            </div>
        `;
    }

    get form() {
        return this.shadowRoot.querySelector('iron-form');
    }

    connectedCallback() {
        super.connectedCallback();
        this.addEventListener('dom-change', () => {
            // See https://github.com/PolymerElements/iron-form/issues/263
            this.form._saveInitialValues();
        });
    }

    _formRequestResponded(e) {
        this.dispatchEvent(new Event('submit-success'));
    }

    _formError(e) {
        this.dispatchEvent(new Event('submit-error'));
    }

    reset() {
        this.form.reset();
        this.pageNumber = 0;
    }

    send() {
        if (!this.form.validate()) {
            return;
        }
        this.form.submit();
    }

    next() {
        if (!this.form.validate()) {
            return;
        }

        if (this.pageNumber >= this.data.length - 1) {
            this.send();
            return;
        }
        this.pageNumber+=1;
    }

    prev() {
        if (this.pageNumber <= 0) {
            return;
        }
        this.pageNumber-=1;
    }

    _compteNextBtnTitle(totalPages, pageNumber) {
        return totalPages - 1 === pageNumber ? 'SEND' : 'NEXT';
    }

    _computePrevDisabled(pageNumber) {
        return pageNumber <= 0;
    }

    _isLastPage(pagesLen, index) {
        return pagesLen - 1 === index;
    }

    _beql(a, b) {
        return a >= b;
    }

    _eql(...args) {
        return args.every((val, i, arr) => val === arr[0]);
    }
}
customElements.define('quiz-view', QuizView);

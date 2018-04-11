import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import '@polymer/polymer/lib/elements/dom-repeat';
import '@polymer/polymer/lib/elements/dom-if';

import './checkbox-question.js';
import './radio-question.js';

class QuizView extends PolymerElement {
    static get properties() {
        return {
            data: {
                type: Array,
                value() {
                    return [
                        {
                            index: 1,
                            title: 'Page 1',
                            questions: [
                                {title: 'Desires', type: 'checkbox', name: 'desires', choices: [{name:'y', label: 'Yes'}, {name:'n', label: 'No'}]},
                                {title: 'Color choice', type: 'radio', name: 'color', choices: [{name:'r', label: 'Red'}, {name:'g', label: 'Green'}]}
                            ]
                        },
                        {
                            index: 2,
                            title: 'Page 2',
                            questions: [
                                {title: 'Desires', type: 'checkbox', name: 'desires', choices: [{name:'y', label: 'Yes'}, {name:'n', label: 'No'}]},
                                {title: 'Color choice', type: 'radio', name: 'color', choices: [{name:'r', label: 'Red'}, {name:'g', label: 'Green'}]}
                            ]
                        }
                    ]
                }
            },

            _pageData: {
                type: Object,
                computed: '_computePageData(data, index)',
            },

            index: {
                type: Number,
                value: 1,
            },

            url: String,

            method: {
                type: String,
                value: 'post',
            }
        }
    }
    static get template () {
        return html`
            <style>
                section {
                    margin: 12px;
                    padding: 12px;
                }

                .container {

                }
                .checkbox-section > paper-checkbox {
                    margin: 12px;
                }
            </style>
            <div class="container">
                <iron-form>
                    <form method$="[[method]]" action$="[[url]]">
                        <h2>[[_pageData.title]]</h2>
                        <template is="dom-repeat" items="[[_pageData.questions]]" as="question">
                            <h3>[[question.title]]</h3>
                            <section>
                                <template is="dom-if" if="[[_eql(question.type, 'checkbox')]]">
                                    <checkbox-question name$="[[question.name]]" choices="[[question.choices]]"></checkbox-question>
                                </template>
                                <template is="dom-if" if="[[_eql(question.type, 'radio')]]">
                                    <radio-question name$="[[question.name]]" choices="[[question.choices]]"></radio-question>
                                </template>
                            </section>
                        </template>
                    </form>
                </iron-form>
            </div>
        `;
    }

    _computePageData(data, index) {
        return data.find(p => p.index === index);
    }

    _eql(...args) {
        return !!args.reduce((a, b) => (a === b) ? a : NaN);
    }
} 
customElements.define('quiz-view', QuizView);
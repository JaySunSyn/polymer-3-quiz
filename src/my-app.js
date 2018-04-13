import {PolymerElement, html} from '@polymer/polymer/polymer-element';
import '@polymer/polymer/lib/elements/dom-if';

import '@polymer/iron-ajax/iron-ajax';

import '@polymer/paper-checkbox/paper-checkbox';
import '@polymer/paper-toast/paper-toast';

import './quiz-view.js';

/**
 * `my-app` Description
 *
 * @summary ShortDescription.
 * @customElement
 * @polymer
 * @extends {Polymer.Element}
 */
class MyApp extends PolymerElement {
    static get template() {
        return html`
            <style>
                :host {
                    --accent-color: #FF9800;
                    --accent-text-color: #FFF;

                    --primary-color: #00BCD4;
                    --bar-color: rgb(0, 151, 167, 0.95);
                    --secondary-color: #4DD0E1;
                }
            </style>
            <iron-ajax
                last-response="{{questions}}"
                url="./data/questions.json" 
                handle-as="json"
                auto>
            </iron-ajax>
            <quiz-view
                data="[[questions.data]]"
                url="https://jsonplaceholder.typicode.com/posts"
                method="post"
                on-submit-success="_success"
                on-submit-error="_error">
            </quiz-view>
            <paper-toast vertical-align="top" horizontal-align="right"></paper-toast>
        `;
    }

    get quiz() {
        return this.shadowRoot.querySelector('quiz-view');
    }

    get toast() {
        return this.shadowRoot.querySelector('paper-toast');
    }

    _error() {
        this.toast.show('Something went wrong ...');
    }

    _success() {
        this.toast.show('Yaay, success!');
        this.quiz.reset();
    }
}
customElements.define('my-app', MyApp);

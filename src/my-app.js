import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import '@polymer/polymer/lib/elements/dom-if';
import '@polymer/paper-checkbox/paper-checkbox';

import './quiz-view.js';

class MyApp extends PolymerElement {
    static get properties() {
        return {
        }
    }
    static get template () {
        // Always return an HTMLTemplateElement, not a string literal
        return html`
            <h1>Hello World</h1>
            <quiz-view></quiz-view>
        `;
    }
} 
customElements.define('my-app', MyApp);
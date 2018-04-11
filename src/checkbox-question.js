import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import '@polymer/polymer/lib/elements/dom-repeat';
import '@polymer/paper-checkbox/paper-checkbox';

class CheckboxQuestion extends PolymerElement {
    static get properties() {
        return {
            choices: Array,
            value: {
                type: String,
                value: '',
                reflectToAttribute: true,
            }
        }
    }
    static get template () {
        // Always return an HTMLTemplateElement, not a string literal
        return html`
            <style>
                paper-checkbox {
                    margin: 12px;
                }
            </style>
            <template is="dom-repeat" items="[[choices]]" as="choice">
                <paper-checkbox data-name$="[[choice.name]]" on-change="_setValue">[[choice.label]]</paper-checkbox>
            </template>
        `;
    }

    _setValue() {
        this.value = Array.from(this.shadowRoot.querySelectorAll('paper-checkbox'))
                        .filter(c => c.checked)
                        .map(c => c.dataset.name)
                        .join(',');
    }
} 
customElements.define('checkbox-question', CheckboxQuestion);
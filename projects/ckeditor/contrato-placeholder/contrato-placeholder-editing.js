import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import {toWidget, viewToModelPositionOutsideModelElement} from '@ckeditor/ckeditor5-widget/src/utils';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';
import PlaceholderCommand from './contrato-placeholder-command';

export default class ContratoPlaceholderEditing extends Plugin {
  static get requires() {
    return [Widget];
  }

  init() {
    this._defineSchema();
    this._defineConverters();

    this.editor.commands.add('placeholder', new PlaceholderCommand(this.editor));

    this.editor.editing.mapper.on(
      'viewToModelPosition',
      viewToModelPositionOutsideModelElement(this.editor.model, viewElement => viewElement.hasClass('placeholder'))
    );
    this.editor.config.define('placeholderConfig', {
      types: ['date', 'first name', 'surname']
    });
  }

  _defineSchema() {
    const schema = this.editor.model.schema;

    schema.register('placeholder', {
      // Allow wherever text is allowed:
      allowWhere: '$text',
      // The placeholder will act as an inline node:
      isInline: true,
      // The inline widget is self-contained so it cannot be split by the caret and it can be selected:
      isObject: true,

      // The inline widget can have the same attributes as text (for example linkHref, bold).
      allowAttributesOf: '$text',

      // The placeholder can have many types, like date, name, surname, etc:
      allowAttributes: ['name']
    });
  }

  _defineConverters() {
    const conversion = this.editor.conversion;
    const _shortcodes = this.editor.config.get('shortcodes');

    conversion.for('upcast').elementToElement({
      view: {
        name: 'span',
        classes: ['placeholder']
      },
      model: (viewElement, {writer: modelWriter}) => {
        // Extract the "name" from "{name}".
        const name = viewElement.getAttribute('name');

        return modelWriter.createElement('placeholder', {name});
      }
    });

    conversion.for('editingDowncast').elementToElement({
      model: 'placeholder',
      view: (modelItem, {writer: viewWriter}) => {
        const widgetElement = createPlaceholderView(modelItem, viewWriter, _shortcodes);

        // Enable widget handling on a placeholder element inside the editing view.
        return toWidget(widgetElement, viewWriter);
      }
    });

    conversion.for('dataDowncast').elementToElement({
      model: 'placeholder',
      view: (modelItem, {writer: viewWriter}) => createPlaceholderView(modelItem, viewWriter, _shortcodes, true)
    });

    // Helper method for both downcast converters.
    function createPlaceholderView(modelItem, viewWriter, shortcodes, isToData) {
      const name = modelItem.getAttribute('name');

      const text = shortcodes.has(name) ? shortcodes.get(name) : 'Inválido!';

      const placeholderView = viewWriter.createContainerElement('span', {
        name: name,
        class: 'placeholder'
      }, {
        isAllowedInsideAttributeElement: true
      });

      // Insert the placeholder name (as a text).
      const innerText = isToData ? viewWriter.createText('{' + name + '}') : viewWriter.createText(text);
      viewWriter.insert(viewWriter.createPositionAt(placeholderView, 0), innerText);

      return placeholderView;
    }
  }
}


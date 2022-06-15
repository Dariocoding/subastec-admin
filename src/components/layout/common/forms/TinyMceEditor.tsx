import * as React from 'react';
import 'tinymce/tinymce';
import 'tinymce/themes/silver';
import 'tinymce/icons/default';
import 'tinymce/skins/ui/oxide/skin.min.css';
import 'tinymce/models/dom';
import 'tinymce/plugins/advlist';
import 'tinymce/plugins/autolink';
import 'tinymce/plugins/link';
import 'tinymce/plugins/image';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/charmap';
import 'tinymce/plugins/anchor';
import 'tinymce/plugins/searchreplace';
import 'tinymce/plugins/wordcount';
import 'tinymce/plugins/code';
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/insertdatetime';
import 'tinymce/plugins/media';
import 'tinymce/plugins/nonbreaking';
import 'tinymce/plugins/table';
import 'tinymce/plugins/template';
import 'tinymce/plugins/help';
import { Editor } from '@tinymce/tinymce-react';
import { Editor as TinyMceEditorRef } from 'tinymce';
import { getIn, useFormikContext } from 'formik';

interface ITinyMceEditorProps {
	name: string;
}

const TinyMceEditor: React.FC<ITinyMceEditorProps> = props => {
	const { name } = props;
	const editorRef = React.useRef<TinyMceEditorRef | null>();
	const { values, setFieldValue } = useFormikContext();
	const value = getIn(values, name);

	return (
		<div className="form-group">
			<Editor
				onInit={(evt, editor) => (editorRef.current = editor)}
				init={{
					height: 400,
					menubar: 'file edit view insert format tools table help',
					contextmenu: false,
					plugins: `print preview paste importcss searchreplace autolink autosave save 
					directionality code visualblocks visualchars fullscreen image link media 
					template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists 
					wordcount imagetools textpattern noneditable help charmap quickbars emoticon `,
					toolbar1: 'undo redo format formatselect bold italic underline strikethrough forecolor backcolor removeformat',
					toolbar2: 'fullscreen link unlink numlist outdent indent bullist alignleft aligncenter alignright alignjustify image',
					//toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
					toolbar_sticky: true,
					content_style:
						'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
					content_css: false,
					skin: false,
				}}
				apiKey={'cfbqz9c66v92y2oyrmvdg5gzyrnri9z9corxitjuqsl1nla9'}
				value={value}
				onEditorChange={value => setFieldValue(name, value)}
			/>
		</div>
	);
};

export default TinyMceEditor;

/* toolbar1: 'link fullscreen bold italic backcolor',
toolbar2: 'alignleft aligncenter alignright alignjustify | bullist numlist outdent indent', */

/* plugins: [
	'advlist autolink lists link image charmap print preview anchor',
	'searchreplace visualblocks code fullscreen',
], */

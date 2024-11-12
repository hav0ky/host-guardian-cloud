import React, { useState, useEffect, useRef } from 'react';
import {
    Bold,
    Italic,
    Underline as UnderlineIcon,
    Strikethrough,
    Code,
    Link as LinkIcon,
    ListOrdered,
    List as ListUnordered,
    AlignLeft,
    AlignCenter,
    AlignRight,
    AlignJustify,
    Undo,
    Redo,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface TextEditorProps {
    wordLimit?: number;
    handleChange?: (content: string) => void;
    initialContent?: string;
    placeHolderText?: string;
    shouldReset?: boolean;
    onResetComplete?: () => void;
}

const TextEditor: React.FC<TextEditorProps> = ({
    wordLimit = 5,
    handleChange,
    initialContent = '',
    placeHolderText,
    shouldReset = false,
    onResetComplete,
}) => {
    const editorRef = useRef<HTMLDivElement>(null);
    const [wordCount, setWordCount] = useState(0);
    const [isOverLimit, setIsOverLimit] = useState(false);
    const [content, setContent] = useState(initialContent);

    useEffect(() => {
        setContent(initialContent);
    }, [initialContent]);

    useEffect(() => {
        if (shouldReset) {
            setContent('');
            if (editorRef.current) {
                editorRef.current.innerHTML = '';
            }
            setWordCount(0);
            setIsOverLimit(false);
            if (onResetComplete) onResetComplete();
        }
    }, [shouldReset, onResetComplete]);

    const countWords = (text: string): number => {
        const matches = text.trim().match(/\b\w+\b/g);
        return matches ? matches.length : 0;
    };

    const handleContentChange = () => {
        const htmlContent = editorRef.current?.innerHTML || '';
        const textContent = editorRef.current?.textContent || '';
        setContent(textContent);
        const currentWordCount = countWords(textContent);
        setWordCount(currentWordCount);
        setIsOverLimit(currentWordCount > wordLimit);
        if (currentWordCount <= wordLimit) {
            handleChange?.(htmlContent);
        }
    };

    return (
        <div className="border rounded-md p-2">
            <MenuBar
                execCommand={(cmd, value) => { document.execCommand(cmd, false, value); editorRef.current?.focus(); }}
                handleLink={() => { const url = prompt('Enter the URL', 'https://'); if (url) document.execCommand('createLink', false, url); }}
                handleUndo={() => document.execCommand('undo', false)}
                handleRedo={() => document.execCommand('redo', false)}
            />
            <Separator className="my-2" />
            <div
                ref={editorRef}
                contentEditable
                onInput={handleContentChange}
                onKeyUp={handleContentChange}
                className={`min-h-[200px] focus:outline-none p-2 ${isOverLimit ? 'border-red-500' : ''}`}
                style={{
                    overflowWrap: 'break-word',
                    overflowX: 'hidden',
                    whiteSpace: 'pre-wrap'
                }}
            >
                {content === '' && <span style={{ color: '#cccccc' }} className="placeholder ">{placeHolderText}</span>}
            </div>
            {isOverLimit && (
                <div className="text-red-500 text-sm mt-1">
                    Word limit exceeded! Content has been truncated.
                </div>
            )}
        </div>
    );
};

const MenuBar: React.FC<{
    execCommand: (command: string, value?: string | null) => void;
    handleLink: () => void;
    handleUndo: () => void;
    handleRedo: () => void;
}> = ({ execCommand, handleLink, handleUndo, handleRedo }) => {
    return (
        <div className="flex flex-wrap gap-2 mb-2">
            <Button type="button" variant="ghost" size="sm" onClick={() => execCommand('bold')}><Bold className="w-4 h-4" /></Button>
            <Button type="button" variant="ghost" size="sm" onClick={() => execCommand('italic')}><Italic className="w-4 h-4" /></Button>
            <Button type="button" variant="ghost" size="sm" onClick={() => execCommand('underline')}><UnderlineIcon className="w-4 h-4" /></Button>
            <Button type="button" variant="ghost" size="sm" onClick={() => execCommand('strikeThrough')}><Strikethrough className="w-4 h-4" /></Button>
            <Button type="button" variant="ghost" size="sm" onClick={() => execCommand('insertHTML', '<code></code>')}><Code className="w-4 h-4" /></Button>
            <Button type="button" variant="ghost" size="sm" onClick={handleLink}><LinkIcon className="w-4 h-4" /></Button>
            <Button type="button" variant="ghost" size="sm" onClick={() => execCommand('insertOrderedList')}><ListOrdered className="w-4 h-4" /></Button>
            <Button type="button" variant="ghost" size="sm" onClick={() => execCommand('insertUnorderedList')}><ListUnordered className="w-4 h-4" /></Button>
            <Button type="button" variant="ghost" size="sm" onClick={() => execCommand('justifyLeft')}><AlignLeft className="w-4 h-4" /></Button>
            <Button type="button" variant="ghost" size="sm" onClick={() => execCommand('justifyCenter')}><AlignCenter className="w-4 h-4" /></Button>
            <Button type="button" variant="ghost" size="sm" onClick={() => execCommand('justifyRight')}><AlignRight className="w-4 h-4" /></Button>
            <Button type="button" variant="ghost" size="sm" onClick={() => execCommand('justifyFull')}><AlignJustify className="w-4 h-4" /></Button>
            <Button type="button" variant="ghost" size="sm" onClick={handleUndo}><Undo className="w-4 h-4" /></Button>
            <Button type="button" variant="ghost" size="sm" onClick={handleRedo}><Redo className="w-4 h-4" /></Button>
        </div>
    );
};

export default TextEditor;

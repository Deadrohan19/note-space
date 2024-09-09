"use client"

import React from 'react'

import {
    BlockNoteEditor,
    PartialBlock
} from "@blocknote/core"

import {
    BlockNoteView,

} from "@blocknote/mantine"

import {
    useCreateBlockNote

} from '@blocknote/react'

import "@blocknote/mantine/style.css"
import "@blocknote/core/fonts/inter.css";

import { useTheme } from 'next-themes'

import { useEdgeStore } from '@/lib/edgestore'

interface EditorProps {
    onChange: (value: string) => void;
    initialContent?: string;
    editable?: boolean;
};

const Editor = (
    {onChange, initialContent, editable}: EditorProps
) => {
    const { resolvedTheme } = useTheme();

    const { edgestore } = useEdgeStore();

    const handleUpload = async (file: File) => {
        const res = await edgestore.publicFiles.upload({
            file
        })

        return res.url;
    }


    const editor: BlockNoteEditor = useCreateBlockNote({
        initialContent: initialContent ? JSON.parse(initialContent) as PartialBlock[] : undefined,
        uploadFile: handleUpload,
    })


  return (
    <div>
        <BlockNoteView
            editor={editor}
            theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
            editable={editable}
            onChange={(editor: BlockNoteEditor) => { onChange(JSON.stringify(editor.topLevelBlocks, null, 2))}}
        />
    </div>
  )
}

export default Editor;
"use client"
import { convertFileToUrl } from '@/lib/utils';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import upload from "@/public/assets/icons/upload.svg"

type FileUploaderProps = {
  files: File[] | undefined;
  onChange: (files: File[]) => void;
};

const Fileuploader = ({ files, onChange }: FileUploaderProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onChange(acceptedFiles);
  }, [onChange]);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}
    className='file-upload'>
      <input {...getInputProps()} />
      {files && files?.length > 0 ? (
        <Image src={convertFileToUrl(files[0])}
        width={1000}
        height={1000}
        alt="uploaded image" 
        className="max-h-[400px] overflow-hidden object-cover"/>
      ): 
      <>
      <Image 
      src={upload}
      alt='upload'
      width={40}
      height={40}/>
      <div className='file-upload_label'>
        <p className='text-14 regular'>
            <span className='text-green-500'>
                Clique para enviar
            </span> ou arraste para enviar
        </p>
        <p>
            SVG, PNG, JPF or Gif (Max 800x400)
        </p>
      </div>
      </>
      }
    </div>
  )
}

export default Fileuploader;
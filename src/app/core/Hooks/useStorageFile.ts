import { useRef } from "react";
import { StorageFile, StorageFileStatus } from "../data/storageFile";
import type { Setting } from "../data/setting";

export default function useStorageFile(setFormData: React.Dispatch<React.SetStateAction<Setting>>) {

    const fileInputRef = useRef<HTMLInputElement>(null);
    
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        // 1. Validate File Size (2MB = 2 * 1024 * 1024 bytes)
        const maxSizeInBytes = 2 * 1024 * 1024;
        if (file.size > maxSizeInBytes) {
            alert("حجم الملف كبير جداً. الحد الأقصى هو 2 ميجابايت.");
            if (fileInputRef.current) 
                fileInputRef.current.value = "";
            return;
        }

        // 2. Validate File Type (JPG, PNG, GIF)
        const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
        if (!allowedTypes.includes(file.type)) {
            alert("نوع الملف غير مدعوم. يرجى اختيار JPG أو PNG أو GIF.");
            if (fileInputRef.current) fileInputRef.current.value = "";
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result as string;
            const base64Data = base64String.split(",")[1];

            setFormData((prev) => ({
            ...prev,
            logo: new StorageFile({
                url: base64String, 
                base64File: base64Data, 
                extension: `.${file.name.split(".").pop()}`,
                contentType: file.type,
                status: StorageFileStatus.New, 
            }),
            }));
        };
        reader.readAsDataURL(file);
    };

    const handleRemoveLogo = () => {
        setFormData((prev) => ({
        ...prev,
        logo: prev.logo
            ? { ...prev.logo, status: StorageFileStatus.Delete, url: null }
            : undefined,
        }));
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

  return {fileInputRef, handleFileChange, handleRemoveLogo};

}
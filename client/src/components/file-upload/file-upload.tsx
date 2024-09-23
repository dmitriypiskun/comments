import styles from "./file-upload.module.css";

export interface FileUploadProps {
  accept?: string;
  onChange: (value?: File | null) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ accept, onChange }) => {
  return (
    <input
      id="file"
      type="file"
      name="filename"
      accept={accept}
      className={styles["container"]}
      onChange={(e) => onChange(e.target.files?.[0])}
    />
  );
};

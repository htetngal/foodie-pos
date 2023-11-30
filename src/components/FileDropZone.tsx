import { Box, Typography } from "@mui/material";
import { useDropzone } from "react-dropzone";

interface Props {
  onFileSelected: (acceptedFiles: File[]) => void;
}

const FileDropZone = ({ onFileSelected }: Props) => {
  const onDrop = (acceptedFiles: File[]) => {
    onFileSelected(acceptedFiles);
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <Box
      {...getRootProps()}
      sx={{
        width: "100%",
        mt: 2,
        border: "1px dotted black",
        borderRadius: 10,
        p: 3,
        textAlign: "center",
        cursor: "pointer",
      }}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <Typography>Drag Here</Typography>
      ) : (
        <Typography>Select or Drag</Typography>
      )}
    </Box>
  );
};

export default FileDropZone;

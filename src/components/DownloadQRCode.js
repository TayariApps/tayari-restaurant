import React from "react";
import { FaDownload } from "react-icons/fa";
import { saveAs } from "file-saver";

export default function DownloadQRCode({ image }) {
  return (
    <FaDownload
      className="me-4"
      onClick={() => {
        saveAs(`${process.env.REACT_APP_SITE_URL}/${image}`, "qrcode.jpg");
      }}
    />
  );
}

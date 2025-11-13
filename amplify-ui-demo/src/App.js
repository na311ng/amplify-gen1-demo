import React, { useState, useEffect } from "react";
import { Amplify } from "aws-amplify";
import awsExports from "./aws-exports";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

// ✅ Amplify v6의 Storage 모듈 import 방식
import { uploadData, list, getUrl } from "aws-amplify/storage";

Amplify.configure(awsExports);

function App({ signOut, user }) {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  // 🔹 파일 선택
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // 🔹 파일 업로드
  const uploadFile = async () => {
    if (!file) return alert("📁 파일을 선택하세요!");

    try {
      const key = `${user.username}/${file.name}`;

      await uploadData({
        key,
        data: file,
        options: {
          accessLevel: "public",
          contentType: file.type,
        },
      }).result;

      alert("✅ 업로드 성공!");
      fetchImage(key);
    } catch (err) {
      console.error("🚨 업로드 오류:", err);
      alert("업로드 실패! 콘솔을 확인하세요.");
    }
  };

  // 🔹 가장 최근 이미지 불러오기
  const loadLatestImage = async () => {
    try {
      const result = await list({
        path: `${user.username}/`,
        options: { accessLevel: "public" },
      });
      if (result.items.length > 0) {
        const latest = result.items[result.items.length - 1].key;
        fetchImage(latest);
      }
    } catch (err) {
      console.error("🚨 리스트 불러오기 실패:", err);
    }
  };

  // 🔹 이미지 URL 가져오기
  const fetchImage = async (key) => {
    try {
      const url = await getUrl({
        key,
        options: { accessLevel: "public" },
      });
      setImageUrl(url.url.href);
    } catch (err) {
      console.error("🚨 이미지 URL 불러오기 실패:", err);
    }
  };

  useEffect(() => {
    loadLatestImage();
  }, []);

  return (
    <main style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Welcome, {user.username} 👋</h1>
      <p>BookStorage (S3)에 이미지 업로드 테스트</p>
      <input type="file" onChange={handleFileChange} />
      <button onClick={uploadFile}>Upload</button>

      {imageUrl && (
        <div style={{ marginTop: "20px" }}>
          <img
            src={imageUrl}
            alt="Uploaded"
            style={{ width: "300px", borderRadius: "8px" }}
          />
        </div>
      )}

      <div style={{ marginTop: "40px" }}>
        <button onClick={signOut}>Sign out</button>
      </div>
    </main>
  );
}

export default withAuthenticator(App);

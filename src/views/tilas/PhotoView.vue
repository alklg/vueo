<template>
  <div>
    <button @click="downloadImage">Download Image</button>
  </div>
</template>

<script>
import axios from "axios";
axios.defaults.baseURL = 'http://119.45.145.96:8080'

export default {
  methods: {
    downloadImage() {
      // 下载处理后的图片
      axios.get('/photoSolve', { responseType: 'blob' }) // 设置响应类型为 Blob
          .then(response => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'processed_image.jpg');
            document.body.appendChild(link);
            link.click();
            window.URL.revokeObjectURL(url); // 释放对象 URL
          })
          .catch(error => {
            console.error('Error downloading image:', error);
          });
    }
  }
}
</script>
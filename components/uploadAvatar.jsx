import { useState } from 'react';
import { Upload, message } from 'antd';

import { PlusOutlined } from '@ant-design/icons';

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 < 350;
  if (!isLt2M) {
    message.error('Image must smaller than 350KB!');
  }
  return isJpgOrPng && isLt2M;
};
const UploadAvatar = ({ file, myUrl, onChange = () => {}, ...props }) => {
  const [imageUrl, setImageUrl] = useState('');
  if (file) {
    getBase64(file, (url) => {
      setImageUrl(url);
    });
  }
  const handleChange = (info) => {
    getBase64(info.file.originFileObj, (url) => {
      setImageUrl(url);
    });

    onChange(info.file.originFileObj);
  };
  const uploadButton = (
    <div>
      <PlusOutlined />
    </div>
  );
  return (
    <Upload
      {...props}
      customRequest={({ onSuccess }) => {
        onSuccess();
      }}
      name='avatar'
      listType='picture-card'
      className='avatar-uploader'
      showUploadList={false}
      beforeUpload={beforeUpload}
      onChange={handleChange}
      multiple={false}
      accept='image/png, image/jpeg'
      // fileList={fileList}
    >
      {imageUrl || myUrl ? (
        <div style={{ cursor: 'pointer' }}>
          <img src={imageUrl ? imageUrl : myUrl} alt='avatar' />
        </div>
      ) : (
        uploadButton
      )}
    </Upload>
  );
};

export default UploadAvatar;

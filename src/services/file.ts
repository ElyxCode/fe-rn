import { ApiResponse } from "apisauce";
import { api } from "../api/api-config";
import { FileResponse, FileResponseError } from "../model/File";

export const uploadFileService = async (token: string, filePath: string, fileName: string) : Promise<ApiResponse<FileResponse|FileResponseError>> => {

    let form = new FormData();
    form.append('image', {
        name: fileName,
        uri:  filePath,
        type: 'image/jpeg',
    });
    const headers = {
        Authorization: "Bearer "+token,
        'Content-Type': 'multipart/form-data'
      }
    return api.post('/files', form, { headers });
  };
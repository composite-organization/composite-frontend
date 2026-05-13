import { http } from '../../../lib/http';

export interface LectureMaterialWidget {
  id: number;
  attachmentWidgetId: number;
  name: string;
  size: number;
  unit: string;
}

export interface LectureMaterialWidgetDetail {
  url: string;
}

export interface UploadLectureMaterialRequest {
  attachment: File;
}

export async function fetchLectureMaterialWidgets(
  attachmentWidgetId: number,
): Promise<LectureMaterialWidget[]> {
  const response = await http.get<LectureMaterialWidget[]>(
    `/attachmentWidgets/${attachmentWidgetId}/attachments`,
  );
  return response.data;
}

export async function uploadLectureMaterial(
  attachmentWidgetId: number,
  body: UploadLectureMaterialRequest,
): Promise<LectureMaterialWidget> {
  const formData = new FormData();
  formData.append('attachment', body.attachment);

  const response = await http.post<LectureMaterialWidget>(
    `/attachmentWidgets/${attachmentWidgetId}/attachments`,
    formData,
  );
  return response.data;
}

export async function fetchLectureMaterialWidgetDetail(
  attachmentWidgetId: number,
  attachmentId: number,
): Promise<LectureMaterialWidgetDetail> {
  const response = await http.get<LectureMaterialWidgetDetail>(
    `/attachmentWidgets/${attachmentWidgetId}/attachments/${attachmentId}`,
  );
  return response.data;
}

export async function deleteLectureMaterial(
  attachmentWidgetId: number,
  attachmentId: number,
): Promise<void> {
  await http.delete(
    `/attachmentWidgets/${attachmentWidgetId}/attachments/${attachmentId}`,
  );
}

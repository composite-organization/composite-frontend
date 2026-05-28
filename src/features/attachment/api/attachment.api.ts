import { http } from '../../../lib/http';

export interface AttachmentWidget {
  id: number;
  widgetId: number;
}

export interface CreateAttachmentWidgetRequest {
  lessonId: number;
}

export interface CreateAttachmentWidgetResponse {
  id: number;
  lessonId: number;
}

export interface AttachmentWidgetAttachment {
  id: number;
  attachmentWidgetId: number;
  name: string;
  size: number;
  unit: string;
}

export interface AttachmentWidgetAttachmentDetail {
  url: string;
}

export interface UploadAttachmentWidgetAttachmentRequest {
  attachment: File;
}

export async function createAttachmentWidget(
  body: CreateAttachmentWidgetRequest,
): Promise<CreateAttachmentWidgetResponse> {
  const response = await http.post<CreateAttachmentWidgetResponse>(
    '/attachmentWidgets',
    body,
  );
  return response.data;
}

export async function fetchAttachmentWidget(
  attachmentWidgetId: number,
): Promise<AttachmentWidget> {
  const response = await http.get<AttachmentWidget>(
    `/attachmentWidgets/${attachmentWidgetId}`,
  );
  return response.data;
}

export async function deleteAttachmentWidget(
  attachmentWidgetId: number,
): Promise<void> {
  await http.delete(`/attachmentWidgets/${attachmentWidgetId}`);
}

export async function fetchAttachmentWidgetAttachments(
  attachmentWidgetId: number,
): Promise<AttachmentWidgetAttachment[]> {
  const response = await http.get<AttachmentWidgetAttachment[]>(
    `/attachmentWidgets/${attachmentWidgetId}/attachments`,
  );
  return response.data;
}

export async function uploadAttachmentWidgetAttachment(
  attachmentWidgetId: number,
  body: UploadAttachmentWidgetAttachmentRequest,
): Promise<AttachmentWidgetAttachment> {
  const formData = new FormData();
  formData.append('attachment', body.attachment);

  const response = await http.post<AttachmentWidgetAttachment>(
    `/attachmentWidgets/${attachmentWidgetId}/attachments`,
    formData,
  );
  return response.data;
}

export async function fetchAttachmentWidgetAttachmentDetail(
  attachmentWidgetId: number,
  attachmentId: number,
): Promise<AttachmentWidgetAttachmentDetail> {
  const response = await http.get<AttachmentWidgetAttachmentDetail>(
    `/attachmentWidgets/${attachmentWidgetId}/attachments/${attachmentId}`,
  );
  return response.data;
}

export async function deleteAttachmentWidgetAttachment(
  attachmentWidgetId: number,
  attachmentId: number,
): Promise<void> {
  await http.delete(
    `/attachmentWidgets/${attachmentWidgetId}/attachments/${attachmentId}`,
  );
}

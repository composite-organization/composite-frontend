import { http } from '../../../lib/http';

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

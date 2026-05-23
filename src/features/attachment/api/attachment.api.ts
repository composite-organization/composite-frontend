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
  token: string,
): Promise<CreateAttachmentWidgetResponse> {
  const response = await http.post<CreateAttachmentWidgetResponse>(
    '/attachmentWidgets',
    body,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
}

export async function fetchAttachmentWidget(
  attachmentWidgetId: number,
  token: string,
): Promise<AttachmentWidget> {
  const response = await http.get<AttachmentWidget>(
    `/attachmentWidgets/${attachmentWidgetId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
}

export async function deleteAttachmentWidget(
  attachmentWidgetId: number,
  token: string,
): Promise<void> {
  await http.delete(`/attachmentWidgets/${attachmentWidgetId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function fetchAttachmentWidgetAttachments(
  attachmentWidgetId: number,
  token: string,
): Promise<AttachmentWidgetAttachment[]> {
  const response = await http.get<AttachmentWidgetAttachment[]>(
    `/attachmentWidgets/${attachmentWidgetId}/attachments`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
}

export async function uploadAttachmentWidgetAttachment(
  attachmentWidgetId: number,
  body: UploadAttachmentWidgetAttachmentRequest,
  token: string,
): Promise<AttachmentWidgetAttachment> {
  const formData = new FormData();
  formData.append('attachment', body.attachment);

  const response = await http.post<AttachmentWidgetAttachment>(
    `/attachmentWidgets/${attachmentWidgetId}/attachments`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
}

export async function fetchAttachmentWidgetAttachmentDetail(
  attachmentWidgetId: number,
  attachmentId: number,
  token: string,
): Promise<AttachmentWidgetAttachmentDetail> {
  const response = await http.get<AttachmentWidgetAttachmentDetail>(
    `/attachmentWidgets/${attachmentWidgetId}/attachments/${attachmentId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
}

export async function deleteAttachmentWidgetAttachment(
  attachmentWidgetId: number,
  attachmentId: number,
  token: string,
): Promise<void> {
  await http.delete(
    `/attachmentWidgets/${attachmentWidgetId}/attachments/${attachmentId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
}

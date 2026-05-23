import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createAttachmentWidget,
  deleteAttachmentWidget,
  deleteAttachmentWidgetAttachment,
  fetchAttachmentWidget,
  fetchAttachmentWidgetAttachmentDetail,
  fetchAttachmentWidgetAttachments,
  uploadAttachmentWidgetAttachment,
  type CreateAttachmentWidgetRequest,
  type UploadAttachmentWidgetAttachmentRequest,
} from './attachment.api';

export function useCreateAttachmentWidgetMutation(token: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: CreateAttachmentWidgetRequest) =>
      createAttachmentWidget(body, token),
    onSuccess: ({ lessonId }) => {
      queryClient.invalidateQueries({
        queryKey: ['lesson', 'widgets', lessonId],
      });
    },
  });
}

export function useAttachmentWidgetQuery(
  attachmentWidgetId: number,
  token: string,
) {
  return useQuery({
    queryKey: ['attachmentWidgets', attachmentWidgetId],
    queryFn: () => fetchAttachmentWidget(attachmentWidgetId, token),
    enabled: !!attachmentWidgetId && !!token,
  });
}

export function useDeleteAttachmentWidgetMutation(token: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (attachmentWidgetId: number) =>
      deleteAttachmentWidget(attachmentWidgetId, token),
    onSuccess: (_data, attachmentWidgetId) => {
      queryClient.invalidateQueries({
        queryKey: ['attachmentWidgets', attachmentWidgetId],
      });
      queryClient.invalidateQueries({ queryKey: ['lesson', 'widgets'] });
    },
  });
}

export function useAttachmentWidgetAttachmentsQuery(
  attachmentWidgetId: number,
  token: string,
) {
  return useQuery({
    queryKey: ['attachmentWidgets', attachmentWidgetId, 'attachments'],
    queryFn: () => fetchAttachmentWidgetAttachments(attachmentWidgetId, token),
    enabled: !!attachmentWidgetId && !!token,
  });
}

export function useUploadAttachmentWidgetAttachmentMutation(token: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      attachmentWidgetId,
      body,
    }: {
      attachmentWidgetId: number;
      body: UploadAttachmentWidgetAttachmentRequest;
    }) => uploadAttachmentWidgetAttachment(attachmentWidgetId, body, token),
    onSuccess: (_data, { attachmentWidgetId }) => {
      queryClient.invalidateQueries({
        queryKey: ['attachmentWidgets', attachmentWidgetId, 'attachments'],
      });
    },
  });
}

export function useAttachmentWidgetAttachmentDetailQuery(
  attachmentWidgetId: number,
  attachmentId: number,
  token: string,
) {
  return useQuery({
    queryKey: [
      'attachmentWidgets',
      attachmentWidgetId,
      'attachments',
      attachmentId,
    ],
    queryFn: () =>
      fetchAttachmentWidgetAttachmentDetail(
        attachmentWidgetId,
        attachmentId,
        token,
      ),
    enabled: !!attachmentWidgetId && !!attachmentId && !!token,
  });
}

export function useDeleteAttachmentWidgetAttachmentMutation(token: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      attachmentWidgetId,
      attachmentId,
    }: {
      attachmentWidgetId: number;
      attachmentId: number;
    }) =>
      deleteAttachmentWidgetAttachment(attachmentWidgetId, attachmentId, token),
    onSuccess: (_data, { attachmentWidgetId }) => {
      queryClient.invalidateQueries({
        queryKey: ['attachmentWidgets', attachmentWidgetId, 'attachments'],
      });
    },
  });
}

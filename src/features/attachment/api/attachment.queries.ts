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

export function useCreateAttachmentWidgetMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: CreateAttachmentWidgetRequest) =>
      createAttachmentWidget(body),
    onSuccess: ({ lessonId }) => {
      queryClient.invalidateQueries({
        queryKey: ['lesson', 'widgets', lessonId],
      });
    },
  });
}

export function useAttachmentWidgetQuery(attachmentWidgetId: number) {
  return useQuery({
    queryKey: ['attachmentWidgets', attachmentWidgetId],
    queryFn: () => fetchAttachmentWidget(attachmentWidgetId),
    enabled: !!attachmentWidgetId,
  });
}

export function useDeleteAttachmentWidgetMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (attachmentWidgetId: number) =>
      deleteAttachmentWidget(attachmentWidgetId),
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
) {
  return useQuery({
    queryKey: ['attachmentWidgets', attachmentWidgetId, 'attachments'],
    queryFn: () => fetchAttachmentWidgetAttachments(attachmentWidgetId),
    enabled: !!attachmentWidgetId,
  });
}

export function useUploadAttachmentWidgetAttachmentMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      attachmentWidgetId,
      body,
    }: {
      attachmentWidgetId: number;
      body: UploadAttachmentWidgetAttachmentRequest;
    }) => uploadAttachmentWidgetAttachment(attachmentWidgetId, body),
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
) {
  return useQuery({
    queryKey: [
      'attachmentWidgets',
      attachmentWidgetId,
      'attachments',
      attachmentId,
    ],
    queryFn: () =>
      fetchAttachmentWidgetAttachmentDetail(attachmentWidgetId, attachmentId),
    enabled: !!attachmentWidgetId && !!attachmentId,
  });
}

export function useDeleteAttachmentWidgetAttachmentMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      attachmentWidgetId,
      attachmentId,
    }: {
      attachmentWidgetId: number;
      attachmentId: number;
    }) => deleteAttachmentWidgetAttachment(attachmentWidgetId, attachmentId),
    onSuccess: (_data, { attachmentWidgetId }) => {
      queryClient.invalidateQueries({
        queryKey: ['attachmentWidgets', attachmentWidgetId, 'attachments'],
      });
    },
  });
}

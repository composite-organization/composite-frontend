import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  deleteAttachmentWidgetAttachment,
  fetchAttachmentWidgetAttachmentDetail,
  fetchAttachmentWidgetAttachments,
  uploadAttachmentWidgetAttachment,
  type UploadAttachmentWidgetAttachmentRequest,
} from './attachmentWidget.api';

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

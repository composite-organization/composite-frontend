import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  fetchLectureMaterialWidgets,
  uploadLectureMaterial,
  fetchLectureMaterialWidgetDetail,
  deleteLectureMaterial,
  type UploadLectureMaterialRequest,
} from './lectureMaterials.api';

export function useLectureMaterialWidgetsQuery(attachmentWidgetId: number) {
  return useQuery({
    queryKey: ['lectureMaterials', attachmentWidgetId],
    queryFn: () => fetchLectureMaterialWidgets(attachmentWidgetId),
    enabled: !!attachmentWidgetId,
  });
}

export function useUploadLectureMaterialMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      attachmentWidgetId,
      body,
    }: {
      attachmentWidgetId: number;
      body: UploadLectureMaterialRequest;
    }) => uploadLectureMaterial(attachmentWidgetId, body),
    onSuccess: (_data, { attachmentWidgetId }) => {
      queryClient.invalidateQueries({
        queryKey: ['lectureMaterials', attachmentWidgetId],
      });
    },
  });
}

export function useLectureMaterialWidgetDetailQuery(
  attachmentWidgetId: number,
  attachmentId: number,
) {
  return useQuery({
    queryKey: ['lectureMaterials', 'detail', attachmentWidgetId, attachmentId],
    queryFn: () =>
      fetchLectureMaterialWidgetDetail(attachmentWidgetId, attachmentId),
    enabled: !!attachmentWidgetId && !!attachmentId,
  });
}

export function useDeleteLectureMaterialMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      attachmentWidgetId,
      attachmentId,
    }: {
      attachmentWidgetId: number;
      attachmentId: number;
    }) => deleteLectureMaterial(attachmentWidgetId, attachmentId),
    onSuccess: (_data, { attachmentWidgetId }) => {
      queryClient.invalidateQueries({
        queryKey: ['lectureMaterials', attachmentWidgetId],
      });
    },
  });
}

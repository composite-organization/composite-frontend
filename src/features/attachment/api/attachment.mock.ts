import { http, HttpResponse } from 'msw';

let attachmentWidgetIdSequence = 2;
let attachmentIdSequence = 4;

const attachmentWidgets = [
  {
    id: 1,
    lessonId: 1,
    widgetId: 1,
  },
];

const attachments = [
  {
    id: 1,
    attachmentWidgetId: 1,
    name: '1주차 강의 슬라이드.pdf',
    size: 2048000,
    unit: 'byte',
    url: 'https://example.com/files/week1.pdf',
  },
  {
    id: 2,
    attachmentWidgetId: 1,
    name: '실습 예제 코드.zip',
    size: 512000,
    unit: 'byte',
    url: 'https://example.com/files/practice.zip',
  },
  {
    id: 3,
    attachmentWidgetId: 1,
    name: '참고 자료 모음.docx',
    size: 307200,
    unit: 'byte',
    url: 'https://example.com/files/references.docx',
  },
];

function toAttachmentResponse(attachment: (typeof attachments)[number]) {
  return {
    id: attachment.id,
    attachmentWidgetId: attachment.attachmentWidgetId,
    name: attachment.name,
    size: attachment.size,
    unit: attachment.unit,
  };
}

export const attachmentWidgetHandlers = [
  http.post('/attachmentWidgets', async ({ request }) => {
    const body = (await request.json()) as Record<string, unknown>;
    const attachmentWidget = {
      id: attachmentWidgetIdSequence,
      lessonId: Number(body.lessonId),
      widgetId: attachmentWidgetIdSequence,
    };

    attachmentWidgetIdSequence += 1;
    attachmentWidgets.push(attachmentWidget);

    return HttpResponse.json(
      {
        id: attachmentWidget.id,
        lessonId: attachmentWidget.lessonId,
      },
      { status: 201 },
    );
  }),

  http.get('/attachmentWidgets/:attachmentWidgetId', ({ params }) => {
    const attachmentWidgetId = Number(params.attachmentWidgetId);
    const attachmentWidget = attachmentWidgets.find(
      ({ id }) => id === attachmentWidgetId,
    );

    if (!attachmentWidget) {
      return HttpResponse.json(
        { message: 'Attachment widget not found' },
        { status: 404 },
      );
    }

    return HttpResponse.json({
      id: attachmentWidget.id,
      widgetId: attachmentWidget.widgetId,
    });
  }),

  http.delete('/attachmentWidgets/:attachmentWidgetId', ({ params }) => {
    const attachmentWidgetId = Number(params.attachmentWidgetId);
    const attachmentWidgetIndex = attachmentWidgets.findIndex(
      ({ id }) => id === attachmentWidgetId,
    );

    if (attachmentWidgetIndex === -1) {
      return HttpResponse.json(
        { message: 'Attachment widget not found' },
        { status: 404 },
      );
    }

    attachmentWidgets.splice(attachmentWidgetIndex, 1);

    for (let index = attachments.length - 1; index >= 0; index -= 1) {
      if (attachments[index].attachmentWidgetId === attachmentWidgetId) {
        attachments.splice(index, 1);
      }
    }

    return new HttpResponse(null, { status: 200 });
  }),

  http.get(
    '/attachmentWidgets/:attachmentWidgetId/attachments',
    ({ params }) => {
      const attachmentWidgetId = Number(params.attachmentWidgetId);
      const attachmentList = attachments
        .filter(
          (attachment) => attachment.attachmentWidgetId === attachmentWidgetId,
        )
        .map(toAttachmentResponse);

      return HttpResponse.json(attachmentList);
    },
  ),

  http.post(
    '/attachmentWidgets/:attachmentWidgetId/attachments',
    async ({ params, request }) => {
      const attachmentWidgetId = Number(params.attachmentWidgetId);
      const formData = await request.formData();
      const file = formData.get('attachment');

      if (!(file instanceof File)) {
        return HttpResponse.json(
          { message: 'Attachment file is required' },
          { status: 400 },
        );
      }

      const attachment = {
        id: attachmentIdSequence,
        attachmentWidgetId,
        name: file.name,
        size: file.size,
        unit: 'byte',
        url: `https://example.com/files/${encodeURIComponent(file.name)}`,
      };

      attachmentIdSequence += 1;
      attachments.push(attachment);

      return HttpResponse.json(toAttachmentResponse(attachment), {
        status: 201,
      });
    },
  ),

  http.get(
    '/attachmentWidgets/:attachmentWidgetId/attachments/:attachmentId',
    ({ params }) => {
      const attachmentWidgetId = Number(params.attachmentWidgetId);
      const attachmentId = Number(params.attachmentId);
      const attachment = attachments.find(
        ({ id, attachmentWidgetId: widgetId }) =>
          id === attachmentId && widgetId === attachmentWidgetId,
      );

      if (!attachment) {
        return HttpResponse.json(
          { message: 'Attachment not found' },
          { status: 404 },
        );
      }

      return HttpResponse.json({ url: attachment.url });
    },
  ),

  http.delete(
    '/attachmentWidgets/:attachmentWidgetId/attachments/:attachmentId',
    ({ params }) => {
      const attachmentWidgetId = Number(params.attachmentWidgetId);
      const attachmentId = Number(params.attachmentId);
      const attachmentIndex = attachments.findIndex(
        ({ id, attachmentWidgetId: widgetId }) =>
          id === attachmentId && widgetId === attachmentWidgetId,
      );

      if (attachmentIndex === -1) {
        return HttpResponse.json(
          { message: 'Attachment not found' },
          { status: 404 },
        );
      }

      attachments.splice(attachmentIndex, 1);
      return new HttpResponse(null, { status: 200 });
    },
  ),
];

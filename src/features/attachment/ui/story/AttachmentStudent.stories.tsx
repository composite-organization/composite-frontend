import type { Meta, StoryObj } from '@storybook/react-vite';
import type { AttachmentWidget } from '../../types';
import AttachmentWidgetStudent from '../AttachmentStudent';

const meta: Meta<typeof AttachmentWidgetStudent> = {
  title: 'Feature/AttachmentWidgetStudent',
  component: AttachmentWidgetStudent,
  argTypes: {
    attachments: {
      description: '표시할 강의 자료 목록',
      control: false,
    },
    onDownload: {
      description: '자료 다운로드 버튼 클릭 시 호출되는 핸들러',
      action: 'onDownload',
    },
  },
};

export default meta;
type Story = StoryObj<typeof AttachmentWidgetStudent>;

const sampleAttachments: AttachmentWidget[] = [
  {
    id: '1',
    name: '1주차 강의 슬라이드.pdf',
    size: 2048000,
    uploadedAt: '2026-03-10T09:00:00Z',
    url: 'https://example.com/files/week1.pdf',
  },
  {
    id: '2',
    name: '실습 예제 코드.zip',
    size: 512000,
    uploadedAt: '2026-03-12T14:30:00Z',
    url: 'https://example.com/files/practice.zip',
  },
  {
    id: '3',
    name: '참고 자료 모음.docx',
    size: 307200,
    uploadedAt: '2026-03-15T11:00:00Z',
    url: 'https://example.com/files/references.docx',
  },
];

export const Default: Story = {
  args: {
    attachments: sampleAttachments,
    onDownload: () => {},
  },
};

export const Empty: Story = {
  args: {
    attachments: [],
    onDownload: () => {},
  },
};

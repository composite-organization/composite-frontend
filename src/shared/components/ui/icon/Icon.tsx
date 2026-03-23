type IconName =
  | 'add'
  | 'close'
  | 'copy'
  | 'delete'
  | 'download'
  | 'edit'
  | 'info'
  | 'link'
  | 'more'
  | 'pin'
  | 'upload'
  | 'file'
  | 'note'
  | 'quiz'
  | 'vote'
  | 'question'
  | 'module'
  | 'PC'
  | 'chat';

interface IconProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  name: IconName;
  size?: number;
  decorative?: boolean;
}

function Icon({
  name,
  size = 16,
  className,
  decorative = false,
  ...props
}: IconProps) {
  return (
    <img
      src={`/assets/icons/${name}.svg`}
      alt={decorative ? '' : name}
      width={size}
      height={size}
      className={className}
      {...props}
    />
  );
}

export default Icon;

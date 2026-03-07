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
  | 'upload';

interface IconProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  name: IconName;
  size?: number;
}

function Icon({ name, size = 16, className, ...props }: IconProps) {
  return (
    <img
      src={`/assets/icons/${name}.svg`}
      alt={name}
      width={size}
      height={size}
      className={className}
      {...props}
    />
  );
}

export default Icon;

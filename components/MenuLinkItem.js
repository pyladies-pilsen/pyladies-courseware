import Link from 'next/link'

export default (props) => {
  const { active, href, content } = props;
  const cls = active ? 'item active' : 'item';
  return (
    <Link href={href} prefetch><a className={cls}>{content}</a></Link>
  );
};

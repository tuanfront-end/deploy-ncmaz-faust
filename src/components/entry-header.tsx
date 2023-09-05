type EntryHeaderProps = {
  title: string;
  date?: Date | string;
  author?: string;
};

export default function EntryHeader({ title, date, author }: EntryHeaderProps) {
  return (
    <div className="text-center mb-10">
      {title && <h2 className="text-3xl xl:text-4xl">{title}</h2>}

      {date && author && (
        <div className="text-sm mt-5">
          By {author} on <time>{new Date(date).toDateString()}</time>
        </div>
      )}
    </div>
  );
}

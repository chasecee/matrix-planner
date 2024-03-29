import Link from "next/link";

interface HeaderProps {
  title: string;
  authorLink: string;
}

export const Header = ({ title, authorLink }: HeaderProps) => (
  <div className="flex flex-row justify-between items-baseline">
    <h1 className="text-xl mb-3">{title}</h1>
    <p>
      by{" "}
      <Link
        href={authorLink}
        className="border-b border-opacity-40 border-white"
      >
        Chase Cee
      </Link>
    </p>
  </div>
);

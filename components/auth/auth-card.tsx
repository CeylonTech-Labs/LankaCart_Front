import Link from "next/link";

type AuthCardProps = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footerText?: string;
  footerHref?: string;
  footerLinkText?: string;
};

export function AuthCard({
  title,
  subtitle,
  children,
  footerText,
  footerHref,
  footerLinkText
}: AuthCardProps) {
  return (
    <div className="mx-auto w-full max-w-md rounded-md border bg-card p-6 shadow-sm">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">{subtitle}</p>
      </div>
      {children}
      {footerText && footerHref && footerLinkText ? (
        <p className="mt-6 text-center text-sm text-muted-foreground">
          {footerText}{" "}
          <Link href={footerHref} className="font-medium text-primary hover:underline">
            {footerLinkText}
          </Link>
        </p>
      ) : null}
    </div>
  );
}

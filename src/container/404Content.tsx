import MyImage from "@/components/MyImage";
import SEO from "@/components/SEO/SEO";
import { NC_SITE_SETTINGS } from "@/contains/site-settings";
import Image from "next/image";
import Link from "next/link";

export default function Page404Content() {
  return (
    <div className="">
      <SEO
        title={"This page does not exist (404)"}
        description={"Sorry, we couldn’t find the page you’re looking for."}
      />

      <main className="mx-auto w-full max-w-7xl px-6 pb-16 pt-5 sm:pb-20 lg:px-8">
        <div className="max-w-2xl text-center mx-auto">
          <Image
            src={"/images/404.webp"}
            width={750}
            height={500}
            alt="404"
            className="w-auto mx-auto"
          />
        </div>
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            Page not found
          </h1>
          <p className="mt-4 text-base leading-7 text-gray-600 dark:text-neutral-400">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className="mt-10 flex justify-center">
            <Link
              href="/"
              className="text-sm font-semibold leading-7 text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-500"
            >
              <span className="me-2 rtl:rotate-180" aria-hidden="true">
                &larr;
              </span>
              Back to home
            </Link>
          </div>
        </div>
      </main>
      <footer className="border-t border-gray-100 dark:border-neutral-600 py-6 sm:py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-8 px-6 sm:flex-row lg:px-8">
          <p className="text-sm leading-7 text-gray-400">
            {NC_SITE_SETTINGS.site_footer.all_rights_reserved_text}
          </p>
          <div className="hidden sm:block sm:h-7 sm:w-px sm:flex-none sm:bg-gray-200 dark:bg-neutral-600" />
          <div className="flex gap-x-4">
            {NC_SITE_SETTINGS.site_socials.map((item) => (
              <a
                key={item.name}
                href={item.url}
                className="block relative"
                target="_blank"
                rel="noreferrer"
              >
                <span className="hidden dark:block absolute -inset-0.5 rounded-lg bg-neutral-300 "></span>
                <span className="sr-only">{item.name}</span>
                <MyImage
                  width={22}
                  height={22}
                  className="opacity-60 max-h-[22px] hover:opacity-100"
                  src={item.icon}
                  alt={item.name}
                />
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

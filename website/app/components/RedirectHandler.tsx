"use client";

import { useEffect } from "react";
import { useRouter } from "../../i18n/routing";

export function RedirectHandler() {
  const router = useRouter();

  useEffect(() => {
    if (window.location.hash === "#contactForm") {
      router.replace("/contact");
    }
  }, [router]);

  return null;
}

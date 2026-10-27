"use client"

import * as React from "react"
import HalftoneWordmarkFooter, {
  type FooterColumn,
} from "@/components/ui/halftone-wordmark-footer"

const MAPS_URL = "https://maps.app.goo.gl/es7rea6o8RAKE8639"

const COLUMNS: FooterColumn[] = [
  {
    title: "Visit",
    links: [
      { label: "1st floor, Hoysala Inn", href: MAPS_URL },
      { label: "Kompally Road, Ruby Block", href: MAPS_URL },
      { label: "Hyderabad 500100", href: MAPS_URL },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "Home", href: "/" },
      { label: "Menu", href: "/menu/" },
      { label: "About us", href: "/#about-us" },
      { label: "Contact", href: "/contact-us" },
    ],
  },
  {
    title: "Reserve",
    links: [
      { label: "79951 33353", href: "tel:+917995133353" },
      { label: "Book a table", href: "/#reservation" },
    ],
  },
]

const CSS = `
.mkf { background: #762326; color: #f4dfb8; }
.mkf-band {
  height: 44px;
  background: url("/assets/kolam-diamond.svg") repeat-x center / auto 36px;
  border-bottom: 0.5px solid rgb(244 223 184 / 0.2);
  opacity: 0.85;
}
#reserve-table { display: block; height: 0; scroll-margin-top: 110px; }
`

/** Matches the dot pitch to the viewport so the word stays legible on phones. */
function useDotGap() {
  const [gap, setGap] = React.useState(6)
  React.useEffect(() => {
    const mq = window.matchMedia("(max-width: 720px)")
    const apply = () => setGap(mq.matches ? 4 : 6)
    apply()
    mq.addEventListener("change", apply)
    return () => mq.removeEventListener("change", apply)
  }, [])
  return gap
}

export default function MalnaduFooter() {
  const dotGap = useDotGap()
  return (
    <div id="visit-us" className="mkf">
      <style>{CSS}</style>
      <span id="reserve-table" tabIndex={-1} aria-hidden="true" />
      <div className="mkf-band" aria-hidden="true" />
      <HalftoneWordmarkFooter
        wordmark="malnadu"
        label="Malnadu Kitchen"
        meta="©2026 · Taste of Telangana, Kompally"
        columns={COLUMNS}
        palette={{ background: "#762326", ink: "#f4dfb8", warm: "#f2a93b" }}
        dotGap={dotGap}
        radius={90}
        crop={0.18}
        grain={0.45}
        fontFamily={'"Gabarito", "Inter Tight", "Helvetica Neue", Arial, system-ui, sans-serif'}
        fontWeight={800}
        height="clamp(540px, 48vw, 680px)"
      />
    </div>
  )
}

import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import EngagementPopup from "@/components/EngagementPopup";

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  axes: ["opsz", "SOFT"],
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Joey De Leon, Realtor® | Southern California",
  description:
    "Joey De Leon, Realtor® with Power Real Estate Group, helps Southern California buyers and sellers move with confidence. Orange County, Inland Empire, and Greater LA, Irvine, Yorba Linda, Newport Beach, Riverside, Long Beach & beyond.",
  openGraph: {
    title: "Joey De Leon, Realtor® | Southern California",
    description:
      "Premium Southern California real estate representation. Search homes, get a complimentary valuation, and work with a trusted local advisor.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="bg-ivory text-charcoal antialiased font-sans">
        <SiteHeader />
        <main className="min-h-[60vh]">{children}</main>
        <SiteFooter />
        <EngagementPopup />
        {/*
          Inline runtime script. Handles:
            1. Reveal-on-scroll (.reveal → .in-view via IntersectionObserver)
            2. RealScout web components script loader
            3. window.open override → same-page modal iframe so visitors stay on Joey's site
         */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){
// ---- Reveal on scroll ----
function startReveal(){var els=document.querySelectorAll('.reveal');if(!('IntersectionObserver' in window)){els.forEach(function(el){el.classList.add('in-view');});return;}var io=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in-view');io.unobserve(e.target);}});},{threshold:0.12,rootMargin:'0px 0px -40px 0px'});els.forEach(function(el){io.observe(el);});}
// ---- RealScout web components loader (idempotent) ----
function loadRealScout(){if(window.__rsLoaded)return;window.__rsLoaded=true;var s=document.createElement('script');s.type='module';s.src='https://em.realscout.com/widgets/realscout-web-components.umd.js';s.async=true;document.head.appendChild(s);}
// ---- Keep RealScout navigation on-site ----
// RealScout widgets call window.open(...,"_blank") to send users to the agent
// subdomain (joeydeleon440.realscout.com). Intercept those calls and load the
// URL into a same-page modal iframe so visitors stay on Joey's site.
function setupRealScoutSamePage(){var origOpen=window.open;window.open=function(url,target,features){try{if(typeof url==='string' && url.indexOf('realscout.com')!==-1){openRsModal(url);return null;}}catch(e){}return origOpen.call(window,url,target,features);};}
function openRsModal(url){var m=document.getElementById('rs-modal');if(!m){m=document.createElement('div');m.id='rs-modal';m.setAttribute('role','dialog');m.setAttribute('aria-modal','true');m.style.cssText='position:fixed;inset:0;z-index:9999;background:rgba(8,15,30,0.78);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;padding:24px;opacity:0;transition:opacity .2s ease;';var inner=document.createElement('div');inner.style.cssText='position:relative;width:100%;max-width:1400px;height:100%;max-height:900px;background:#FAF7F2;border-radius:14px;overflow:hidden;box-shadow:0 30px 60px -15px rgba(0,0,0,0.5);';var close=document.createElement('button');close.setAttribute('aria-label','Close');close.innerHTML='&times;';close.style.cssText='position:absolute;top:12px;right:14px;z-index:2;width:38px;height:38px;border-radius:50%;background:rgba(255,255,255,0.95);border:1px solid rgba(0,0,0,0.08);color:#0F1F3D;font-size:24px;line-height:1;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 12px rgba(0,0,0,0.15);';close.onclick=function(){closeRsModal();};var frame=document.createElement('iframe');frame.id='rs-modal-frame';frame.style.cssText='width:100%;height:100%;border:0;display:block;';frame.setAttribute('allow','geolocation; clipboard-write; fullscreen; storage-access *');frame.setAttribute('credentialless','true');frame.setAttribute('referrerpolicy','no-referrer-when-downgrade');inner.appendChild(close);inner.appendChild(frame);m.appendChild(inner);m.addEventListener('click',function(e){if(e.target===m)closeRsModal();});document.addEventListener('keydown',rsKeyHandler);document.body.appendChild(m);}var iframe=document.getElementById('rs-modal-frame');iframe.src=url;m.style.display='flex';document.body.style.overflow='hidden';requestAnimationFrame(function(){m.style.opacity='1';});}
function closeRsModal(){var m=document.getElementById('rs-modal');if(!m)return;m.style.opacity='0';document.body.style.overflow='';document.removeEventListener('keydown',rsKeyHandler);setTimeout(function(){m.style.display='none';var f=document.getElementById('rs-modal-frame');if(f)f.src='about:blank';},220);}
function rsKeyHandler(e){if(e.key==='Escape')closeRsModal();}
function init(){setupRealScoutSamePage();loadRealScout();startReveal();}
if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',init);}else{init();}
})();`,
          }}
        />
      </body>
    </html>
  );
}

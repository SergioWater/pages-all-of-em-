import { For, createSignal, onCleanup, onMount, Show } from "solid-js";
import type { GalleryImage, GallerySection } from "../lib/gallery";

type Props = {
  slides: GalleryImage[];
  sections: GallerySection[];
  imgPath: string;
};

export default function GalleryIsland(props: Props) {
  const [carouselIndex, setCarouselIndex] = createSignal(0);
  const [lightboxIndex, setLightboxIndex] = createSignal<number | null>(null);

  const allImages = () => props.sections.flatMap((section) => section.images);

  let timer: ReturnType<typeof setInterval> | undefined;

  const next = () => setCarouselIndex((i) => (i + 1) % props.slides.length);
  const prev = () =>
    setCarouselIndex(
      (i) => (i - 1 + props.slides.length) % props.slides.length,
    );

  onMount(() => {
    timer = setInterval(next, 5000);
  });
  onCleanup(() => {
    if (timer) clearInterval(timer);
  });

  const openLightbox = (globalIndex: number) => setLightboxIndex(globalIndex);
  const closeLightbox = () => setLightboxIndex(null);

  const lightboxPrev = () => {
    const images = allImages();
    setLightboxIndex((i) =>
      i === null ? null : (i - 1 + images.length) % images.length,
    );
  };
  const lightboxNext = () => {
    const images = allImages();
    setLightboxIndex((i) => (i === null ? null : (i + 1) % images.length));
  };

  const sectionStart = (sectionIndex: number) => {
    let start = 0;
    for (let i = 0; i < sectionIndex; i++) {
      start += props.sections[i].images.length;
    }
    return start;
  };

  return (
    <>
      <section class="hero-carousel" aria-label="Featured Sentinels photos">
        <div class="carousel-track">
          <For each={props.slides}>
            {(slide, i) => (
              <figure
                classList={{
                  "carousel-slide": true,
                  "is-active": carouselIndex() === i(),
                }}
              >
                <img
                  src={`${props.imgPath}${slide.src}`}
                  alt={slide.alt}
                  loading={i() === 0 ? "eager" : "lazy"}
                />
                <Show when={slide.caption}>
                  <figcaption class="carousel-caption">{slide.caption}</figcaption>
                </Show>
              </figure>
            )}
          </For>
        </div>
        <button
          class="carousel-arrow carousel-arrow--prev"
          type="button"
          aria-label="Previous slide"
          onClick={prev}
        >
          &#10094;
        </button>
        <button
          class="carousel-arrow carousel-arrow--next"
          type="button"
          aria-label="Next slide"
          onClick={next}
        >
          &#10095;
        </button>
        <div class="carousel-dots">
          <For each={props.slides}>
            {(_, i) => (
              <button
                type="button"
                classList={{
                  "carousel-dot": true,
                  "is-active": carouselIndex() === i(),
                }}
                aria-label={`Go to slide ${i() + 1}`}
                onClick={() => setCarouselIndex(i())}
              />
            )}
          </For>
        </div>
      </section>

      <section id="gallery" class="section">
        <div class="section-inner">
          <h2>
            Team <span class="accent">Gallery</span>
          </h2>
          <div class="section-divider" />
          <p class="section-subtitle">
            Sentinels players, teams, and moments from tournaments, training, and
            everything in between — Morgan Hill, Gilroy, and Hollister.
          </p>
          <p
            style={{
              "text-align": "center",
              "max-width": "720px",
              margin: "0 auto 8px",
            }}
          >
            Follow us on{" "}
            <a
              href="https://www.instagram.com/sentinels.soccer.club"
              target="_blank"
              rel="noopener noreferrer"
            >
              <strong>Instagram</strong>
            </a>{" "}
            and{" "}
            <a
              href="https://www.facebook.com/sentinelssoccerclub/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <strong>Facebook</strong>
            </a>{" "}
            for the most recent photos and highlights.
          </p>

          <For each={props.sections}>
            {(section, sIndex) => (
              <>
                <h2 class="gallery-section-title">
                  <i
                    class={`fas ${section.icon}`}
                    style={{ color: "var(--gold)" }}
                  />{" "}
                  {section.title}
                </h2>
                <div class="section-divider" />
                <div
                  classList={{
                    "photo-grid": true,
                    "academy-grid": section.id === "grid-academy",
                  }}
                  id={section.id}
                >
                  <For each={section.images}>
                    {(image, i) => (
                      <img
                        class="gallery-thumb"
                        src={`${props.imgPath}${image.src}`}
                        alt={image.alt}
                        loading="lazy"
                        tabindex="0"
                        role="button"
                        onClick={() =>
                          openLightbox(sectionStart(sIndex()) + i())
                        }
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            openLightbox(sectionStart(sIndex()) + i());
                          }
                        }}
                      />
                    )}
                  </For>
                </div>
              </>
            )}
          </For>
        </div>
      </section>

      <Show when={lightboxIndex() !== null}>
        <div class="lightbox" role="dialog" aria-modal="true">
          <div class="lightbox-backdrop" onClick={closeLightbox} />
          <button
            type="button"
            class="lightbox-close"
            aria-label="Close"
            onClick={closeLightbox}
          >
            &times;
          </button>
          <button
            type="button"
            class="lightbox-arrow lightbox-arrow--prev"
            aria-label="Previous photo"
            onClick={lightboxPrev}
          >
            &#10094;
          </button>
          <img
            class="lightbox-img"
            src={`${props.imgPath}${allImages()[lightboxIndex()!].src}`}
            alt={allImages()[lightboxIndex()!].alt}
          />
          <button
            type="button"
            class="lightbox-arrow lightbox-arrow--next"
            aria-label="Next photo"
            onClick={lightboxNext}
          >
            &#10095;
          </button>
        </div>
      </Show>
    </>
  );
}

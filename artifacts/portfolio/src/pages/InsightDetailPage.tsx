import { Link, useParams } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { INSIGHTS, UI } from "@/lib/site";
import { useT } from "@/components/site/LanguageProvider";
import CommentSection from "@/components/site/CommentSection";

export default function InsightDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { t } = useT();
  const idx = INSIGHTS.findIndex((p) => p.id === id);
  const post = INSIGHTS[idx];

  if (!post) {
    return (
      <div className="container-x section-y text-center">
        <div className="eyebrow">404</div>
        <h1 className="mt-6 font-display text-4xl font-medium">Essay not found</h1>
        <Button asChild className="mt-8 rounded-full" variant="outline">
          <Link to="/insights">{t(UI.cta.backToInsights) as string}</Link>
        </Button>
      </div>
    );
  }

  const prev = INSIGHTS[idx - 1];
  const next = INSIGHTS[idx + 1];

  return (
    <article data-testid="insight-detail-page" className="container-x section-y">
      <div className="mb-10">
        <Link to="/insights" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors link-underline" data-testid="insight-back">
          <ArrowLeft className="h-4 w-4" /> {t(UI.cta.backToInsights) as string}
        </Link>
      </div>

      <header className="max-w-3xl mb-12">
        <div className="eyebrow">{t(post.category) as string} · {post.date} · {t(post.readTime) as string}</div>
        <h1 className="mt-6 font-display text-4xl sm:text-5xl tracking-tighter leading-[0.95] font-medium text-balance">
          {t(post.title) as string}
        </h1>
        <p className="mt-6 text-lg text-muted-foreground leading-relaxed">{t(post.excerpt) as string}</p>
      </header>

      <div className="aspect-[2/1] overflow-hidden rounded-lg border border-border bg-muted mb-16 max-w-5xl">
        <img src={post.cover} alt={t(post.title) as string} className="h-full w-full object-cover" />
      </div>

      {post.youtubeId && (
        <div className="mb-16 max-w-3xl">
          <div className="eyebrow mb-4">{t(UI.sections.insightsHeader.watchTalk) as string}</div>
          <div className="aspect-video overflow-hidden rounded-lg border border-border" data-testid="insight-video">
            <iframe
              src={`https://www.youtube.com/embed/${post.youtubeId}`}
              title="Companion talk"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="h-full w-full"
            />
          </div>
        </div>
      )}

      <div className="max-w-3xl grid gap-8 text-lg leading-relaxed" data-testid="insight-body">
        {(t(post.body) as string[]).map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      <div className="mt-12 max-w-3xl flex flex-wrap gap-2">
        {post.skills.map((s) => (
          <span key={s} className="text-xs px-3 py-1.5 rounded-full border border-border">{s}</span>
        ))}
      </div>

      <div className="mt-16 border-t border-border pt-10 grid sm:grid-cols-2 gap-6 max-w-5xl">
        {prev ? (
          <Link to={`/insights/${prev.id}`} data-testid="insight-prev" className="group flex flex-col gap-2 p-6 rounded-lg border border-border hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-2 text-xs text-muted-foreground"><ArrowLeft className="h-4 w-4" /> Previous</div>
            <div className="font-display text-base font-medium">{t(prev.title) as string}</div>
          </Link>
        ) : <div />}
        {next && (
          <Link to={`/insights/${next.id}`} data-testid="insight-next" className="group flex flex-col gap-2 p-6 rounded-lg border border-border hover:bg-muted/50 transition-colors text-right ml-auto w-full">
            <div className="flex items-center gap-2 text-xs text-muted-foreground justify-end">{t(UI.cta.nextEssay) as string} <ArrowRight className="h-4 w-4" /></div>
            <div className="font-display text-base font-medium">{t(next.title) as string}</div>
          </Link>
        )}
      </div>

      <div className="max-w-5xl">
        <CommentSection postId={post.id} />
      </div>
    </article>
  );
}

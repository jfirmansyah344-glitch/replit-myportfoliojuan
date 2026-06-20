import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { UI } from "@/lib/site";
import { useT } from "./LanguageProvider";

interface Comment {
  id: number;
  name: string;
  content: string;
  created_at: string;
}

export default function CommentSection({ postId }: { postId: string }) {
  const { t } = useT();
  const [comments, setComments] = useState<Comment[]>([]);
  const [form, setForm] = useState({ name: "", email: "", content: "" });
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/comments/${postId}`);
      if (res.ok) setComments(await res.json());
    } catch { /* silent */ }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, [postId]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.content) {
      toast.error(t(UI.comments.fillRequired) as string);
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ post_id: postId, ...form }),
      });
      if (!res.ok) throw new Error();
      toast.success(t(UI.comments.submitSuccess) as string);
      setForm({ name: "", email: "", content: "" });
      load();
    } catch {
      toast.error(t(UI.comments.submitError) as string);
    } finally { setSubmitting(false); }
  };

  return (
    <section data-testid="comment-section" className="border-t border-border pt-12 mt-16">
      <div className="eyebrow mb-3">{t(UI.comments.sectionEyebrow) as string}</div>
      <h2 className="font-display text-2xl sm:text-3xl tracking-tight font-medium">{t(UI.comments.sectionHeading) as string}</h2>
      <p className="mt-2 text-muted-foreground max-w-2xl text-base">{t(UI.comments.sectionSub) as string}</p>

      <div className="mt-10 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7">
          {loading ? (
            <p className="text-sm text-muted-foreground">…</p>
          ) : comments.length === 0 ? (
            <p className="text-sm text-muted-foreground" data-testid="comments-empty">{t(UI.comments.empty) as string}</p>
          ) : (
            <ul className="grid gap-6" data-testid="comments-list">
              {comments.map((c) => (
                <li key={c.id} className="border border-border rounded-lg p-5" data-testid={`comment-${c.id}`}>
                  <div className="flex items-center justify-between">
                    <div className="font-medium text-sm">{c.name}</div>
                    <div className="text-xs text-muted-foreground">{new Date(c.created_at).toLocaleDateString()}</div>
                  </div>
                  <p className="mt-3 text-base text-foreground/90 leading-relaxed">{c.content}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

        <form onSubmit={onSubmit} className="lg:col-span-5 grid gap-4" data-testid="comment-form">
          <div className="grid gap-2">
            <Label htmlFor="c-name">{t(UI.form.name) as string}</Label>
            <Input id="c-name" data-testid="comment-name-input" value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder={t(UI.form.placeholderName) as string} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="c-email">{t(UI.comments.emailHint) as string}</Label>
            <Input id="c-email" type="email" data-testid="comment-email-input" value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              placeholder={t(UI.form.placeholderEmail) as string} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="c-content">{t(UI.comments.contentLabel) as string}</Label>
            <Textarea id="c-content" data-testid="comment-content-input" rows={5} value={form.content}
              onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
              placeholder={t(UI.comments.contentPlaceholder) as string} />
          </div>
          <Button type="submit" disabled={submitting} className="rounded-full" data-testid="comment-submit-btn">
            {submitting ? t(UI.comments.submitting) as string : t(UI.comments.submit) as string}
          </Button>
        </form>
      </div>
    </section>
  );
}

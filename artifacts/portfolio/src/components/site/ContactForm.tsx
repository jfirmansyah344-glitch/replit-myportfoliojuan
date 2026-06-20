import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { UI, SITE } from "@/lib/site";
import { useT } from "./LanguageProvider";

export default function ContactForm() {
  const { t } = useT();
  const [form, setForm] = useState({ name: "", email: "", company: "", inquiry_type: "consulting", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error(t(UI.form.fillRequired) as string);
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Server error");
      toast.success(t(UI.form.successToast) as string);
      setForm({ name: "", email: "", company: "", inquiry_type: "consulting", message: "" });
    } catch {
      const mailtoBody = `Name: ${form.name}\nEmail: ${form.email}\nCompany: ${form.company}\nInquiry: ${form.inquiry_type}\n\n${form.message}`;
      window.location.href = `mailto:${SITE.email}?subject=Portfolio Inquiry&body=${encodeURIComponent(mailtoBody)}`;
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="grid gap-6" data-testid="contact-form">
      <div className="grid sm:grid-cols-2 gap-6">
        <div className="grid gap-2">
          <Label htmlFor="name">{t(UI.form.name) as string} *</Label>
          <Input id="name" data-testid="contact-name-input" value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            placeholder={t(UI.form.placeholderName) as string} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">{t(UI.form.workEmail) as string} *</Label>
          <Input id="email" type="email" data-testid="contact-email-input" value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            placeholder={t(UI.form.placeholderEmail) as string} />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div className="grid gap-2">
          <Label htmlFor="company">{t(UI.form.company) as string}</Label>
          <Input id="company" data-testid="contact-company-input" value={form.company}
            onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
            placeholder={t(UI.form.placeholderCompany) as string} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="inquiry">{t(UI.form.inquiry) as string}</Label>
          <Select value={form.inquiry_type} onValueChange={(v) => setForm((f) => ({ ...f, inquiry_type: v }))}>
            <SelectTrigger id="inquiry" data-testid="contact-inquiry-select"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="consulting">{t(UI.form.inquiryOptions.consulting) as string}</SelectItem>
              <SelectItem value="executive_role">{t(UI.form.inquiryOptions.executive_role) as string}</SelectItem>
              <SelectItem value="speaking">{t(UI.form.inquiryOptions.speaking) as string}</SelectItem>
              <SelectItem value="general">{t(UI.form.inquiryOptions.general) as string}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="message">{t(UI.form.message) as string} *</Label>
        <Textarea id="message" rows={6} data-testid="contact-message-input" value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          placeholder={t(UI.form.placeholderMessage) as string} />
      </div>

      <Button type="submit" disabled={submitting} className="rounded-full px-8 self-start" size="lg" data-testid="contact-submit-btn">
        {submitting ? t(UI.cta.sending) as string : t(UI.cta.sendMessage) as string}
      </Button>
    </form>
  );
}

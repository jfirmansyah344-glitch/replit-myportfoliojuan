import { Switch, Route } from "wouter";
import { ThemeProvider } from "@/components/site/ThemeProvider";
import { LanguageProvider } from "@/components/site/LanguageProvider";
import Layout from "@/components/site/Layout";
import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import WorkPage from "@/pages/WorkPage";
import WorkDetailPage from "@/pages/WorkDetailPage";
import ExpertisePage from "@/pages/ExpertisePage";
import InsightsPage from "@/pages/InsightsPage";
import InsightDetailPage from "@/pages/InsightDetailPage";
import RecommendationsPage from "@/pages/RecommendationsPage";
import ContactPage from "@/pages/ContactPage";
import NotFoundPage from "@/pages/NotFoundPage";

export default function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="jf-portfolio-theme">
      <LanguageProvider>
        <Layout>
          <Switch>
            <Route path="/" component={HomePage} />
            <Route path="/work" component={WorkPage} />
            <Route path="/work/:id" component={WorkDetailPage} />
            <Route path="/expertise" component={ExpertisePage} />
            <Route path="/insights" component={InsightsPage} />
            <Route path="/insights/:id" component={InsightDetailPage} />
            <Route path="/recommendations" component={RecommendationsPage} />
            <Route path="/about" component={AboutPage} />
            <Route path="/contact" component={ContactPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </Layout>
      </LanguageProvider>
    </ThemeProvider>
  );
}

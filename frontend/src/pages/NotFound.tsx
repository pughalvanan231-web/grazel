import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <Layout>
      <div className="min-h-[60vh] flex items-center justify-center bg-background-cream py-20 px-6">
        <div className="max-w-md w-full text-center space-y-6">
          <p className="text-xs uppercase tracking-[0.25em] text-primary font-semibold">
            Error 404
          </p>
          <h1 className="font-serif text-4xl md:text-5xl text-foreground">
            Piece Not Found
          </h1>
          <div className="w-12 h-px bg-primary mx-auto my-4" />
          <p className="text-sm text-muted-foreground leading-relaxed">
            The page you are looking for does not exist or has been moved. Discover our collections to find items designed for enduring elegance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link to="/" className="w-full sm:w-auto">
              <Button variant="default" className="w-full px-8 py-3.5 text-xs uppercase tracking-widest bg-primary text-primary-foreground hover:bg-primary-hover rounded-none">
                Return Home
              </Button>
            </Link>
            <Link to="/all" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full px-8 py-3.5 text-xs uppercase tracking-widest border border-foreground bg-transparent text-foreground hover:bg-foreground hover:text-background rounded-none">
                Shop Collection
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;

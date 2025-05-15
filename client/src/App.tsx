import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
<<<<<<< HEAD
import { ThemeProvider } from "next-themes";
=======
import { BingoProvider } from "@/context/BingoContext";
>>>>>>> 103fe362265f463e56b7b450fd857647f03f6ea7

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
<<<<<<< HEAD
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        disableTransitionOnChange
      >
=======
      <BingoProvider>
>>>>>>> 103fe362265f463e56b7b450fd857647f03f6ea7
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
<<<<<<< HEAD
      </ThemeProvider>
=======
      </BingoProvider>
>>>>>>> 103fe362265f463e56b7b450fd857647f03f6ea7
    </QueryClientProvider>
  );
}

export default App;

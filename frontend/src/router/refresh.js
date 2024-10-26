// refresh.js

export function autoRefreshPage() {
    location.reload();
  }
  
  export function refreshRoute(router) {
    router.go(0);
  }
  
  export function refreshRouteWithParams(router, route) {
    router.push({ path: route.path, query: { refresh: Date.now() } });
  }
  
  export function periodicRefresh(interval = 5000) {
    setInterval(function() {
      location.reload();
    }, interval); // Default to 5 seconds
  }
  
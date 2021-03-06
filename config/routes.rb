ActionController::Routing::Routes.draw do |map|
  map.resources :assignments


  # The priority is based upon order of creation: first created -> highest priority.

  # Sample of regular route:
  #   map.connect 'products/:id', :controller => 'catalog', :action => 'view'
  # Keep in mind you can assign values other than :controller and :action

  # Sample of named route:
  #   map.purchase 'products/:id/purchase', :controller => 'catalog', :action => 'purchase'
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   map.resources :products

  # Sample resource route with options:
  #   map.resources :products, :member => { :short => :get, :toggle => :post }, :collection => { :sold => :get }

  # Sample resource route with sub-resources:
  #   map.resources :products, :has_many => [ :comments, :sales ], :has_one => :seller
  
  # Sample resource route with more complex sub-resources
  #   map.resources :products do |products|
  #     products.resources :comments
  #     products.resources :sales, :collection => { :recent => :get }
  #   end

  # Sample resource route within a namespace:
  #   map.namespace :admin do |admin|
  #     # Directs /admin/products/* to Admin::ProductsController (app/controllers/admin/products_controller.rb)
  #     admin.resources :products
  #   end

  # You can have the root of your site routed with map.root -- just remember to delete public/index.html.
  # map.root :controller => "welcome"

  # See how all your routes lay out with "rake routes"
  
  #default
  map.root :controller => 'facebook_users', :action => 'profile'
  
  #aliases
  map.download('/download/', :controller => "assignments", :action => "download")
  map.authors('/assignments/:id/authors', :controller => "assignments", :action => "authors")
  map.add_authors('/assignments/:id/add_authors', :controller => "assignments", :action => "add_authors")  
  map.remove_author('/assignments/:id/remove_author', :controller => "assignments", :action => "remove_author")
  map.upload_file('/assignments/upload_file/:id', :controller => "assignments", :action => "upload_file")  
  map.upload_zip_file('/assignments/upload_zip_file/:id', :controller => "assignments", :action => "upload_zip_file")
  map.accept_copyrights('/policy/', :controller => "assignments", :action => "accept_copyrights")    
  map.edit_file('/assignments/edit_file/:id', :controller => "assignments", :action => "edit_file")  
  map.read_file('/assignments/read_file/:id', :controller => "assignments", :action => "read_file")    
  map.remove_file('/assignments/remove_file/:id', :controller => "assignments", :action => "remove_file")  
  map.profile('/profile/:id', :controller => "facebook_users", :action => "profile")
  map.assignments('assignments',:controller => "assignments", :action => "index")
  map.home('home',:controller => "home", :action => "index")  
  map.search('search',:controller => "assignments", :action => "search")
  map.people('people',:controller => "facebook_users", :action => "index")    
  map.my_catspace('me',:controller => "facebook_users", :action => "my")      

  # Install the default routes as the lowest priority.
  # Note: These default routes make all actions in every controller accessible via GET requests. You should
  # consider removing the them or commenting them out if you're using named routes and resources.
  #map.connect '', :controller => 'getting_started', :action => 'add_facebook_application'
  
  map.connect ':controller/:action/:id'
  map.connect ':controller/:action/:id.:format'
end

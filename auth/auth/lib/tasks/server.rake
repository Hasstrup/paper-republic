task :server do
  `bundle exec rails s -p 8080`
  puts 'server is now running'
end

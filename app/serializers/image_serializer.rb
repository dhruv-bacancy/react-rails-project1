class ImageSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :image_url, :description
end

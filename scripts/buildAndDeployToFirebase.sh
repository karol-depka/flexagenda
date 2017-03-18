
# TODO: add protractor.sh &&, once tests are reliable

ng build \
  && cp -r assets dist \
  && firebase deploy


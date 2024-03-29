;
(function(w, d){
    var _viewElement = null,
        _defaultRoute = null,
        _rendered = false;

        var jsMvc = function(){
            this._routeMap = {};
        }

        jsMvc.prototype.AddRoute = function(controller, route, template){
            this._routeMap[route] = new routeObj(controller, route, template);
        }
        jsMvc.prototype.Initialize = function(){
            var updateViewDelegate = updateView.bind(this);
            _viewElement = d.querySelector('[view]');
            if (!_viewElement) return;
            _defaultRoute = this._routeMap[Object.getOwnPropertyNames(this._routeMap)[0]];
            w.onhashchange = updateViewDelegate;
            updateViewDelegate();
        }

        function updateView(){
            var pageHash = w.location.hash.replace('#', ''),
            routeName = null,
            routeObj = null;

            routeName = pageHash.replace('/', '');

            _rendered = false;

            routeObj = this._routeMap[routeName];
            if(!routeObj){
                routeObj = _defaultRoute;
            }
            loadTemplate(routeObj, _viewElement)

        }

        function loadTemplate(routeObject, _viewElement)
        {
            var xmlhttp;
            if(window.XMLHttpRequest)
            {
                xmlhttp = new XMLHttpRequest();
            }
            else{
                xmlhttp = ActiveXObject('Microsoft.XMLHTTP');
            }

            xmlhttp.onreadystatechange = function(){
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
                    //load view
                    loadView(routeObject, viewElement, xmlhttp.responseText);
                }
            }

            xmlhttp.open('GET', routeObject.template, true);
            xmlhttp.send();
        }

        function loadView(routeObject, viewElement, viewHTML){
            var model = {};
            routeObject.controller(model);
            replaceTokens(viewHtml, model);

            if(!_rendered)
            {
                viewElement.innerHTML = viewHtml;
                _rendered = true;
            }
        }

        function replaceTokens(viewHTML, model){
            var modelProps = Object.getOwnPropertyNames(model);
            modelProps.forEach(function (element, index, array)
            {
                viewHTML = viewHTML.replace('{{' + element + '}}', model[element]);
            });

            return viewHTML;
        }


        var routeObj = function (c, r, t) {
            this.controller = c;
            this.route = r;
            this.template =t;
        }

        w['jsMvc'] = new jsMvc();
})(window, document);
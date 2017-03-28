using System.Collections.Generic;
using Microsoft.AspNet.Mvc.Rendering;

namespace Books.Helpers
{

    public static class LinkExtensions
    {
        public static HtmlString ActionLinkClass(this IHtmlHelper helper, string linkText, string actionName,
            object routeValues, string classAttributes)
        {
            var attributes = new Dictionary<string, object>();
            attributes.Add("class", classAttributes);
            return helper.ActionLink(linkText, actionName, routeValues, attributes);
        }

        public static HtmlString ActionLinkClass(this IHtmlHelper helper, string linkText, string actionName,
            string controllerName, object routeValues, string classAttributes)
        {
            var attributes = new Dictionary<string, object>();
            attributes.Add("class", classAttributes);
            return helper.ActionLink(linkText, actionName, controllerName, routeValues, attributes);
        }

        //public static HtmlString bootstrapSizeInfoDiv()
        //{
        //    return @"<div class="row"><p class="col-lg-12 hidden-md hidden-sm hidden-xs">Size: lg</p><p class="hidden-lg col-md-12 hidden-sm hidden-xs">Size: md</p><p class="hidden-lg hidden-md col-sm-12 hidden-xs">Size: sm</p><p class="hidden-lg hidden-md hidden-sm col-xs-12">Size: xs</p></div>";
        //}

    }
}

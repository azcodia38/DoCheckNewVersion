/**
 * @author PT Docheck Bagi Indonesia
 * @copyright © All rights reserved. DoCheck 2022
 */

 import React from 'react'

 export interface WithMainHomepageHOCProps {}
 
 export default function WithHomepageHOC<
     T extends WithMainHomepageHOCProps = WithMainHomepageHOCProps
 >(WrappedComponent: React.ComponentType<T>) {
     // Try to create a nice displayName for React Dev Tools.
     const displayName =
         WrappedComponent.displayName || WrappedComponent.name || 'Component'
 
     // Creating the inner component. The calculated Props type here is the where the magic happens.
     const ComponentMainWithHomepage = (props: WithMainHomepageHOCProps) => {
         // props comes afterwards so the can override the default ones.
         return <WrappedComponent {...(props as T)} />
     }
 
     ComponentMainWithHomepage.displayName = `withMainHomePage(${displayName})`
 
     return ComponentMainWithHomepage
 }
 
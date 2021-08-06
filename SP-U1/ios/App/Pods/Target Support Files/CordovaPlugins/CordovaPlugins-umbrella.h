#ifdef __OBJC__
#import <UIKit/UIKit.h>
#else
#ifndef FOUNDATION_EXPORT
#if defined(__cplusplus)
#define FOUNDATION_EXPORT extern "C"
#else
#define FOUNDATION_EXPORT extern
#endif
#endif
#endif

#import "PayPalConfiguration.h"
#import "PayPalFuturePaymentViewController.h"
#import "PayPalMobile.h"
#import "PayPalMobileCordovaPlugin.h"
#import "PayPalOAuthScopes.h"
#import "PayPalPayment.h"
#import "PayPalPaymentViewController.h"
#import "PayPalProfileSharingViewController.h"
#import "CDVAssetLibraryFilesystem.h"
#import "CDVFile.h"
#import "CDVLocalFilesystem.h"
#import "CDVCapture.h"

FOUNDATION_EXPORT double CordovaPluginsVersionNumber;
FOUNDATION_EXPORT const unsigned char CordovaPluginsVersionString[];


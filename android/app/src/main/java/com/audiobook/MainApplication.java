package com.audiobook;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.imagepicker.ImagePickerPackage;
import com.reactnativecommunity.slider.ReactSliderPackage;
import com.airbnb.android.react.lottie.LottiePackage;
//import io.invertase.firebase.RNFirebaseAdMobPackage;
import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.auth.RNFirebaseAuthPackage; // <-- Add this line
import io.invertase.firebase.firestore.RNFirebaseFirestorePackage; // <-- Add this line
import io.invertase.firebase.storage.RNFirebaseStoragePackage; // <-- Add this line
import com.guichaguri.trackplayer.TrackPlayer;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.ijzerenhein.magicmove.ReactMagicMovePackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
        new MainReactPackage(),
            new ImagePickerPackage(),
            new ReactSliderPackage(),
            new LottiePackage(),
        new RNFirebasePackage(),
        new RNFirebaseAuthPackage(),
        new RNFirebaseFirestorePackage(), // <-- Add this line
        new RNFirebaseStoragePackage(), // <-- Add this line
//        new RNFirebaseAdMobPackage(),
        new TrackPlayer(),
        new RNGestureHandlerPackage(),
        new ReactMagicMovePackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
